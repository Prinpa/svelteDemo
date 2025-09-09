
<script lang='ts'>
    export const ssr = false;

    import "../styles.css"
    import { minify } from "terser"


    /* 
    Left to do
    - Have the agent names be pulled from another place on the site, maybe with playwright? 
    - find out the actual difference between the embed types and implement something around that
    galuku is a popup
    fin.ai
    mobile responsivness when its
    - was it meant to be client side rendered? I really should start taking notes

    - look into minify or anothing like library to do what i need

    colour inputs maybe next week

    make a second repo with the embed

    chatbox input container
    */


    /* 
    Structure of the array
    User facing name | User facing options in array | name used in the code | values of each option | selection type   
    */
    let optionsArray = [
        ["Ai agent", ["Emily Lead Gen", "Emily", "Tille", "Emily Shopbot"], "agent", ["Emily_Lead_Gen", "Emily", "Tille", "Emily_Shopbot"], "dropdown"],
        ["Embed type", ["Popup", "Inline"], "embedType", ["Popup", "Inline"], "buttons"],
        ["Chatbot height", ["Min", "Mid" , "Max"], "height", ["200px", "300px", "400px"], "buttons"],
        ["Chatbot width", ["Min", "Mid" , "Max"], "width", ["200px", "300px", "400px"], "buttons"],
        ["Agent Swarm", ["On", "Off"], "swarm", ["true", ""], "buttons"],
        ["Quick Links", ["On", "Off"], "quickLinks", ["true", ""], "buttons"],
        ["Welcome Screen", ["On", "Off"], "welcomeScreen", ["true", ""], "buttons"],

    ];
    // State object to track selections for each option
    let selections: Record<string, string> = $state({});
    function updateSelection(optionName: string, value: string) {

        selections[optionName] = value;
    }

    let embedCode = $derived.by(() => {
        let width = selections["width"] || "200px";

        let code = `
        <script>(function(){    
        const c = (t, s, a = {}) => {
            const e = document.createElement(t);
            Object.assign(e.style, s),
                Object.entries(a).forEach(([k, v]) => e.setAttribute(k, v));
            return e
        };
        const e=document.createElement("iframe");
            const w = c("div", {
            position: "fixed",
            bottom: "140px",
            right: "15px",
            width: "${width}",
            height: "600px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            display: "none",
            zIndex: "1001"
        });
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
            bottom: "140px",
            right: "15px",
            width: "${width}",
            height: "600px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            display: "none",
            zIndex: "1001"
        });

        const f = c("iframe", {}, {
            src: "https://chat.moble.io/embed/?config=galuku&height=373px&width=375px&shadow=0&border_round=1&include_personas=1&persona=&include_buttons=&use_voice=&v=1001",
            width: "375",
            height: "600",
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

        // Responsive width for popup
        function u() {
            const e = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16,
                n = window.innerWidth > 60 * e ? 500 : 375;
            w.style.width = n + "px";
            f.width = n;
            var s = f.src.replace(/width=\d+px/, "width=" + n + "px");
            f.src = s;
        }
        u();
        window.addEventListener("resize", u);
        let speechBtnTimeout = setTimeout(() => {
            speechBtn.style.opacity = "1";
            speechBtn.style.transform = "translate(-120%,-120%) scale(1)";
            speechBtn.style.pointerEvents = "auto";
        }, 2000);

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
            } else {
                w.style.display = "none";
                o.style.display = "none";
            }
        });
        x.addEventListener("click", (event) => {
            w.style.display = "none";
            o.style.display = "none";
            event.stopPropagation();
        });

        const s = document.createElement("style");
        s.textContent = \`
            @keyframes botgradient{0%{background-position:0% 50%}100%{background-position:100% 50%}}
        \`;
        document.head.appendChild(s);

    })()<\/script>`;


        return code;
    });

    


</script>

<div class="container">
    <h1>DEPLOY</h1>
    <div class="config-section">
        {#each optionsArray as line}
            <!-- if it should be a row of buttons -->
            {#if line[4] === "buttons"}
                <div class="field">
                    <div>{line[0]}</div>
                    <div class="button-group">
                        {#each line[1] as option, index}
                            <button 
                                onclick={() => updateSelection(line[2], line[3][index])}
                            >
                                {option}
                            </button>
                        {/each}
                    </div>
                </div>
            <!-- if it should be a dropdown -->
            {:else if line[4] === "dropdown"}
                <div class="field">
                    <div>{line[0]}</div>
                    <div class="select-wrapper">
                        <select onchange={(e) =>updateSelection(line[2], e.target?.value)}>
                            <option value="inital" disabled selected>Please select one</option>
                            {#each line[1] as option, index}
                                <option
                                     value={line[3][index]}>{option} </option>
                            {/each}
                        </select>
                    </div>
                </div>
            {/if}
        {/each}
    </div>

    <div class="embed-code-section">
        <div>Embed Code</div>
        <textarea readonly>{embedCode}</textarea>
        <button class="copy-button" onclick={() => {navigator.clipboard.writeText(embedCode);}}>COPY EMBED CODE</button>
    </div>
</div>