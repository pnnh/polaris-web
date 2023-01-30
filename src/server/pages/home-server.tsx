import React from "react";
import { HeaderPartial } from "./partial/header";
import { MetaPartial } from "./partial/meta";

export function HomeServerPage() {
    return <html lang="zh">
        <head>
            <title>北极星</title>
        </head>
        <body className="home">
            <div>
                <HeaderPartial />
                <main>
                    <div className="picture-list">

                    </div>
                </main>
            </div>
            <script type='module' src='/src/entry-client.tsx'></script>
        </body>
    </html>;
}