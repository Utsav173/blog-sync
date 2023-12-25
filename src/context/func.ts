'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcrypt';
import { neon } from '@neondatabase/serverless';
import { randomUUID } from 'crypto';
export const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL as string);

export async function deleteBlog(formData: FormData) {
  try {
    const blogId = formData.get('blogId');
    const auhtorId = formData.get('auhtorId');
    await sql`
      DELETE FROM blogs
      WHERE id = ${blogId}
      AND "authorId" = ${auhtorId}
    `;
    revalidatePath('/', 'page');
  } catch (error) {
    return { error: 'Unable to delete blog' };
  }
}

export async function LoginUser(formData: FormData) {
  try {
    const email: string = formData.get('email')?.toString().trim() || '';
    const password: string = formData.get('password')?.toString().trim() || '';

    // Check if the user exists in the database
    const userResponse = await sql('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (userResponse.length === 0) {
      return {
        error: 'User not found',
      };
    }

    // Verify the password
    const storedUser = userResponse[0];
    const hashedPassword = storedUser.password;

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return {
        error: 'Incorrect password',
      };
    }

    // Redirect or perform actions after successful login
    cookies().set('userId', storedUser.id);
    delete storedUser.password;
    cookies().set('userData', JSON.stringify(storedUser));
    return {
      success: 'Login successful',
    };
  } catch (error) {
    console.error('Error logging in:', error);
    return {
      error: error,
    };
  }
}

export async function SignUpUser(formData: FormData) {
  try {
    const email: string = formData.get('email')?.toString().trim() ?? '';
    const password: string = formData.get('password')?.toString().trim() ?? '';

    await sql`CREATE TABLE IF NOT EXISTS users (
              id TEXT PRIMARY KEY,
              email TEXT,
              password TEXT
            )`;
    // await sql`DELETE FROM users where email = 'utsavk@gmail.com'`
    const response = await sql(`SELECT * FROM users WHERE email = '${email}'`);

    if (response.length > 0) {
      return {
        error: 'User already exists',
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await sql('INSERT INTO users (id, email, password) VALUES ($1, $2, $3)', [
      randomUUID(),
      email,
      hashedPassword,
    ]);

    return {
      success: 'User created successfully',
    };
  } catch (error) {
    console.error('Error retrieving data:', error);
    return {
      error: 'Error retrieving data',
    };
  }
}

export async function createBlog(formData: FormData) {
  try {
    const titleData = formData.get('title')
      ? formData.get('title')?.toString().trim()
      : '';
    const userId = cookies().get('userId')!.value;
    const userData = JSON.parse(cookies().get('userData')!.value);

    // generate slug without slugify
    const slug = formData
      .get('title')
      ?.toString()
      .trim()
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');

    await sql(
      'INSERT INTO blogs (id, title, content, description, author, "authorId", slug) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        randomUUID(),
        titleData,
        formData.get('content')?.toString().trim() || '',
        formData.get('description')?.toString().trim() || '',
        userData.email.split('@')[0],
        userId,
        slug,
      ]
    );

    revalidatePath('/', 'page');
  } catch (error) {
    console.log(error);
    return { error: 'Unable creating blog' };
  }
}

export async function createComments(formData: FormData) {
  await sql(
    'INSERT INTO comments (id, "blogId", author, comment) VALUES ($1, $2, $3, $4)',
    [
      randomUUID(),
      formData.get('blogId'),
      JSON.parse(cookies().get('userData')!.value)?.email.split('@')[0],
      formData.get('comment'),
    ]
  );
  revalidatePath('/blog/[id]', 'page');
}

export async function updateBlog(formData: FormData) {
  try {
    const slug = formData
      .get('title')
      ?.toString()
      .trim()
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
    await sql(
      'UPDATE blogs SET title = $1, content = $2, description = $3, slug = $4 WHERE id = $5 and "authorId" = $6',
      [
        formData.get('title'),
        formData.get('content') || '',
        formData.get('description'),
        slug,
        formData.get('blogId'),
        formData.get('auhtorId'),
      ]
    );
    revalidatePath('/blog/[id]', 'page');
    revalidatePath('/', 'page');
  } catch (error) {
    return {
      error: 'Unable to update blog',
    };
  }
}
