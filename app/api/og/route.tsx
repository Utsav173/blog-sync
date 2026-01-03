import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = req.nextUrl;
		const title = searchParams.get('title');

		if (!title) {
			return new Response('No title provided', { status: 400 });
		}

		console.log(`Generating OG image for title: ${title}`);

		// 1. Load Fonts (CDN)
		const fontBold = await fetch(
			'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff'
		).then((res) => res.arrayBuffer());

		const fontRegular = await fetch(
			'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff'
		).then((res) => res.arrayBuffer());

		// 2. Load Icon (Local FS)
		// We read app/icon.png.
		const iconPath = path.join(process.cwd(), 'app/icon.png');
		const iconBuffer = await fs.readFile(iconPath);
		const iconData = iconBuffer.buffer.slice(
			iconBuffer.byteOffset,
			iconBuffer.byteOffset + iconBuffer.byteLength
		) as ArrayBuffer;

		return new ImageResponse(
			(
				<div
					style={{
						height: '100%',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#09090b', // zinc-950
						position: 'relative',
					}}
				>
					{/* Background Pattern - Modern Glow */}
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							background:
								'radial-gradient(circle at 50% 100%, #1e1b4b 0%, #09090b 50%)', // subtle indigo glow from bottom
							opacity: 0.5,
						}}
					/>

					{/* Content Container */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '40px',
							zIndex: 10,
							padding: '60px',
							textAlign: 'center',
						}}
					>
						{/* Brand / Icon */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '16px',
								border: '1px solid rgba(255,255,255,0.1)',
								padding: '12px 24px',
								borderRadius: '100px',
								background: 'rgba(0,0,0,0.3)',
							}}
						>
							<img
								width="32"
								height="32"
								src={iconData as any}
								style={{ borderRadius: '8px' }}
							/>
							<span
								style={{
									color: '#e4e4e7', // zinc-200
									fontSize: '24px',
									fontFamily: 'Inter',
									fontWeight: 400,
									letterSpacing: '-0.02em',
								}}
							>
								{siteConfig.name}
							</span>
						</div>

						{/* Title */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '12px',
								maxWidth: '900px',
							}}
						>
							<span
								style={{
									fontSize: '80px',
									fontFamily: 'Inter',
									fontWeight: 700,
									color: '#ffffff',
									lineHeight: 1.05,
									letterSpacing: '-0.04em',
									textWrap: 'balance',
									// Text Gradient for premium feel - Not supported well in satori yet without strict flex, leaving as solid white with opacity or just solid white for sharpness
								}}
							>
								{title}
							</span>
						</div>

						{/* Author / Date InfoPill */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
								marginTop: '20px',
							}}
						>
							<span
								style={{
									color: '#71717a', // zinc-500
									fontSize: '20px',
									fontFamily: 'Inter',
									fontWeight: 400,
								}}
							>
								{new Date().toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
								})}
							</span>
							<div
								style={{
									width: '4px',
									height: '4px',
									background: '#52525b',
									borderRadius: '50%',
								}}
							/>
							<span
								style={{
									color: '#e4e4e7',
									fontSize: '20px',
									fontFamily: 'Inter',
									fontWeight: 400,
								}}
							>
								{siteConfig.author}
							</span>
						</div>
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: 'Inter',
						data: fontBold,
						style: 'normal',
						weight: 700,
					},
					{
						name: 'Inter',
						data: fontRegular,
						style: 'normal',
						weight: 400,
					},
				],
			}
		);
	} catch (error) {
		console.error('OG Image generation failed:', error);
		return new Response('Failed to generate image', { status: 500 });
	}
}
