import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../lib/gtag'

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<script
						data-ad-client='ca-pub-4305738680942112'
						async
						src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
					></script>

					{/* Global Site Tag (gtag.js) - Google Analytics */}
					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
						}}
					/>
					
					{/* Cloudflare Web Analytics */}
					<script
						defer
						src='https://static.cloudflareinsights.com/beacon.min.js'
						data-cf-beacon='{"token": "1b8009c3b51b4fd080aa0a6767740d77", "spa": true}'
					></script>
					{/* End Cloudflare Web Analytics */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
