export function generateEmbedCode(selection: Record<string, string>) {
 let code =  `
        (function(){    
        const c = (t: any, s: any, a = {}) => {
            const e = document.createElement(t);
            Object.assign(e.style, s),
                Object.entries(a).forEach(([k, v]) => e.setAttribute(k, v));
            return e
        };
        const isMobile = () => window.innerWidth <= 768;
        function calculateEmbedLink(): string {
            let height = isMobile() ? "89vh": "442px"
            return \`https://chat.moble.io/embed/?config=galuku&shadow=0&border_round=1&height=\${height}&include_personas=1&persona=&include_buttons=&use_voice=&v=1001\`
        }
        const b = c("div", {
            position: "fixed",
            bottom: "40px",
            right: "15px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            zIndex: "1000",
            backgroundImage: "linear-gradient(108deg,#030d14,#00594b,#88b239,#030d14)",
            backgroundSize: "400% 100%",
            animation: "botgradient 10s linear infinite",
            animationDirection: "alternate"
        });
 
        const i = c("img", {
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            objectFit: "cover"
        }, {
            src: "https://cdn.moble.com/w/58/2165881/file/moble-assistant-icon-Sara.png"
        });
        b.appendChild(i);
        
        const o = c("div", {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.4)",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none"
        });
        const x = c("div", {
            fontSize: "24px",
            color: "white",
            fontWeight: "300",
            pointerEvents: "auto",
            cursor: "pointer"
        });
        x.textContent = "⨉";
        o.appendChild(x);
        b.appendChild(o);

        const w = c("div", {
            position: "fixed",
            bottom: isMobile() ? "0" : "140px",
            right: isMobile() ? "0" : "15px",
            width: isMobile() ? "100%" : "${selection["width"]}",
            height: isMobile() ? "100%" : "${selection["height"]}",
            backgroundColor: "white",
            borderRadius: isMobile() ? "0" : "10px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            display: "none",
            zIndex: "1001",
            transition: "all 0.3s ease-in-out"
        });

        const f = c("iframe", {
            width: "100%",
            height: "100vh",
            border: "none"
        }, {
            src: calculateEmbedLink(),
            frameBorder: "0",
            allowFullscreen: "true"
        });
        w.appendChild(f);
        const speechBtn = c("button", {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-80%, -80%) scale(0.6)",
            opacity: "0",
            transition: "all 0.35s cubic-bezier(.55,.06,.68,.19)",
            background: "#fff",
            color: "#111",
            fontSize: "0.875rem",
            fontWeight: "500",
            border: "none",
            outline: "none",
            borderRadius: "999px",
            padding: "8px 18px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.09)",
            cursor: "pointer",
            zIndex: "1002",
            pointerEvents: "auto",
            whiteSpace: "nowrap"
        });
        speechBtn.textContent = "ask me anything about coir";
        b.appendChild(speechBtn);

        document.body.appendChild(b);
        document.body.appendChild(w);


        function u() {
            const e = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16,
                n = "${selection["width"]}";
            w.style.width = n;
            f.width = n.slice(0, -2);
            var s = f.src.replace(/width=\d+px/, "width=" + n);
            f.src = s;
        }
        u();
        window.addEventListener("resize", u);
        let speechBtnTimeout = setTimeout(() => {
            speechBtn.style.opacity = "1";
            speechBtn.style.transform = "translate(-120%,-120%) scale(1)";
            speechBtn.style.pointerEvents = "auto";
        }, 2000);
        window.addEventListener('resize', () => {
        if (w.style.display === "block") {
            f.src = calculateEmbedLink();
            if (isMobile()) {
                w.style.bottom = "0";
                w.style.right = "0";
                w.style.width = "100%";
                w.style.height = "100%";
                w.style.borderRadius = "0";
            } else {
                w.style.bottom = "140px";
                w.style.right = "15px";
                w.style.width = "${selection["width"]}";
                w.style.height = "${selection["height"]}";
                w.style.borderRadius = "10px";
            }
        }});

        function hideSpeechBtn() {
            clearTimeout(speechBtnTimeout);
            speechBtn.style.opacity = "0";
            speechBtn.style.transform = "translate(-50%,-50%) scale(0.8)";
            speechBtn.style.pointerEvents = "none";
        }
        b.addEventListener("click", () => {
            if (w.style.display === "none") {
                w.style.display = "block";
                o.style.display = "flex";
                hideSpeechBtn();

           
                if (isMobile()) {
                    w.style.bottom = "0";
                    w.style.right = "0";
                    w.style.width = "100%";
                    w.style.height = "100%";
                    w.style.borderRadius = "0";
                    b.style.display = "none"; 
                }
            } else {
                w.style.display = "none";
                o.style.display = "none";
                b.style.display = "block"; 
            }
        });
        x.addEventListener("click", (event: any) => {
            w.style.display = "none";
            o.style.display = "none";
            event.stopPropagation();
        });

        const s = document.createElement("style");
        s.textContent = \`
            @keyframes botgradient{0%{background-position:0% 50%}100%{background-position:100% 50%}}
        \`;
        document.head.appendChild(s);

    })()`;
    return code;
}