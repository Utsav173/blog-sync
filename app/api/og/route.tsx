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

		const heading =
			title.length > 140
				? title.substring(0, 140).split(' ').slice(0, -1).join(' ') + '...'
				: title;

		// Load fonts using path.join with process.cwd() for reliability in local and some build environments
		const fontBold = await fs.readFile(
			path.join(process.cwd(), 'assets/fonts/Inter-Bold.ttf')
		);

		const fontRegular = await fs.readFile(
			path.join(process.cwd(), 'assets/fonts/Inter-Regular.ttf')
		);

		return new ImageResponse(
			(
				<div
					style={{
						height: '100%',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						justifyContent: 'space-between',
						backgroundColor: '#09090b',
						padding: '80px',
						position: 'relative',
					}}
				>
					{/* Gradient Backgrounds - Simplified to avoid blur issues */}
					<div
						style={{
							position: 'absolute',
							top: '-200px',
							right: '-200px',
							width: '600px',
							height: '600px',
							background:
								'radial-gradient(circle, rgba(124, 58, 237, 0.15), transparent 70%)',
							opacity: 0.8,
						}}
					/>
					<div
						style={{
							position: 'absolute',
							bottom: '-200px',
							left: '-200px',
							width: '600px',
							height: '600px',
							background:
								'radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)',
							opacity: 0.8,
						}}
					/>

					{/* Header */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							width: '100%',
							zIndex: 10,
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
							}}
						>
							<div
								style={{
									width: '24px',
									height: '24px',
									background:
										'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
									borderRadius: '6px',
								}}
							/>
							<span
								style={{
									color: '#e4e4e7',
									fontSize: '24px',
									fontFamily: 'Inter',
									fontWeight: 700,
									letterSpacing: '-0.02em',
								}}
							>
								{siteConfig.name}
							</span>
						</div>
						<span
							style={{
								color: '#a1a1aa',
								fontSize: '20px',
								fontFamily: 'Inter',
								fontWeight: 400,
							}}
						>
							@{siteConfig.links.twitter.split('/').pop()}
						</span>
					</div>

					{/* Main Content */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '24px',
							zIndex: 10,
							maxWidth: '90%',
						}}
					>
						<span
							style={{
								fontSize: '72px',
								fontFamily: 'Inter',
								fontWeight: 700,
								color: '#ffffff',
								lineHeight: 1.1,
								letterSpacing: '-0.03em',
								textShadow: '0 2px 10px rgba(0,0,0,0.5)',
							}}
						>
							{heading}
						</span>
					</div>

					{/* Footer */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							width: '100%',
							zIndex: 10,
							borderTop: '1px solid #27272a',
							paddingTop: '32px',
						}}
					>
						<div
							style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
						>
							<span
								style={{
									color: '#a1a1aa',
									fontSize: '18px',
									fontFamily: 'Inter',
									fontWeight: 400,
								}}
							>
								Written by
							</span>
							<span
								style={{
									color: '#e4e4e7',
									fontSize: '20px',
									fontFamily: 'Inter',
									fontWeight: 700,
								}}
							>
								{siteConfig.author}
							</span>
						</div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '4px',
								alignItems: 'flex-end',
							}}
						>
							<span
								style={{
									color: '#a1a1aa',
									fontSize: '18px',
									fontFamily: 'Inter',
									fontWeight: 400,
								}}
							>
								Published
							</span>
							<span
								style={{
									color: '#e4e4e7',
									fontSize: '20px',
									fontFamily: 'Inter',
									fontWeight: 700,
								}}
							>
								{new Date().toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
								})}
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
