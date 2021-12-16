import { minify } from "html-minifier-terser"

export async function handle({ request, resolve }) {
    let response = await resolve(request);
    
    if (response.status === 404) {
        request.path = '/404';
        response = await resolve(request);
        response.status= 404;
    }

    if(
        response.headers['content-type'] === 'text/html'
        && 'body' in response && response.body !== undefined
    ){
        const startScript = response.body.match(/<script type="module">(.+?)<\/script>/s)[1];
        const pathModuleStart = startScript.match(/import \{ start \} from "(.+?)";/)[1];
        const startParams = startScript.match(/start\((\{.*\})\);/s)[1];

        const newStartScript = `
            const isTouchable = 'ontouchstart' in document.documentElement

            document.addEventListener('mousemove', startAfterAnyInteraction);
            if(isTouchable) document.addEventListener('touchstart', startAfterAnyInteraction);
            window.addEventListener('scroll', startAfterAnyInteraction);


            async function startAfterAnyInteraction(){
                document.removeEventListener('mousemove', startAfterAnyInteraction);
                if(isTouchable) document.removeEventListener('touchstart', startAfterAnyInteraction);
                window.removeEventListener('scroll', startAfterAnyInteraction);

                let { start } = await import("${pathModuleStart}");
                start(${startParams});
            }
        `;

        response.body = response.body.replace(/<script type="module">.+?<\/script>/s, `<script type="module">${newStartScript}<\/script>`);

        
        response.body = await minify(response.body, {
            removeAttributeQuotes: true,
            caseSensitive: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        });
    }    

    return response;
}

export function getSession(request) {
    // console.log(request);
    return {}
}