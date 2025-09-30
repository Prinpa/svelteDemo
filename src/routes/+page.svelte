<script lang='ts' >
    import "../styles.css"
    import { minify } from "terser"
    import {settings} from "../info.json";
	import { generateEmbedCode } from "../embedCodeGenerator";
	import { onMount } from "svelte";



    /* 
    Left to do
    - Have the agent names be pulled from another place on the site, maybe with playwright? 

    - look into minify or anothing like library to do what i need

    colour inputs maybe next week
    
    more options
    colour 1 2 and 3 and 4
    
    input-color:#1f2421; - colour 1

    backgroundcolour

    color_1=#eef0e1
input_background_color=#eef0e1
question_background_color=#eef0e1e6

color_2=#006fde
input_color=#006fde
placeholder_color=#006fde
question_color=#006fde
action_2_background_color_1=#006fde
action_2_background_color_2=#006fde
action_1_background_color_1=#006fde
action_1_background_color_2=#006fde
answer_background_color=#006fde

color_3=#e60be6
button_border_color=#e60be6
button_background_color=#e60be6

    button-color: #fff;
    button-background-colour: #1f2421;
    button-background-gradient-color:#388880;
    https://chat.moble.io/embed/?config=galuku&avatar_left_align=1&height=492px&width=900px&shadow=0&no_avatar=1&border_round=1&include_personas=1&include_buttons=&use_voice=&v=1014&
    &background_color=%23ff0000
    &color_1=%23eef0e1&input_background_color=%23eef0e1&question_background_color=%23eef0e1e6
    &color_2=%23006fde&input_color=%23006fde&placeholder_color=%23006fde99&question_color=%23006fde&action_2_background_color_1=%23006fde&action_2_background_color_2=%23006fde&action_1_background_color_1=%23006fde&action_1_background_color_2=%23006fde&answer_background_color=%23006fde
    &color_3=%23e60be6&button_border_color=%23e60be6&button_background_color=%23e60be6
    &color_4=%23ff6600
    130deg

    after: 

    https://nora.moble.site
    inline to slide in

    make the current site dyan
    */


    // State object to track selections for each option
    let selections: Record<string, string> = $state({});

    settings.forEach(setting => {
        selections[setting.key] = setting.values[0];
    });

    function updateSelection(optionName: string, value: string) {
        selections[optionName] = value;
        f.src = calculateEmbedLink();
    }

    let embedCode = $derived.by(() => {
        return generateEmbedCode(selections);;
    });

    function cleanHash(str: string) {
        return str.replace(/#/g, '%23');
    }
          
  
        
        
            
        const c = (t: any, s: any, a = {}) => {
            const e = document.createElement(t);
            Object.assign(e.style, s),
                Object.entries(a).forEach(([k, v]) => e.setAttribute(k, v));
            return e
        };  
        const isMobile = () => window.innerWidth <= 768;
        function calculateEmbedLink(): string {
            let url = "https://chat.moble.io/embed/?config=galuku&shadow=0&border_round=1";
            url += "&height=${isMobile() ? '89vh': '242'}";
            url += `&background_color=${cleanHash(selections['background_color'])}`;
            url += `&color_1=${cleanHash(selections['color1'])}&input_background_color=${cleanHash(selections['color1'])}&question_background_color=${cleanHash(selections['color1'])}`;
            url += `&color_2=${cleanHash(selections['color2'])}&input_color=${cleanHash(selections['color2'])}&placeholder_color=${cleanHash(selections['color2'])}&question_color=${cleanHash(selections['color2'])}&action_2_background_color_1=${cleanHash(selections['color2'])}&action_2_background_color_2=${cleanHash(selections['color2'])}&action_1_background_color_1=${cleanHash(selections['color2'])}&action_1_background_color_2=${cleanHash(selections['color2'])}&answer_background_color=${cleanHash(selections['color2'])}`
            url += `&color_3=${cleanHash(selections['color3'])}&button_border_color=${cleanHash(selections['color3'])}&button_background_color=${cleanHash(selections['color3'])}`;
            url += `&color_4=${cleanHash(selections['color4'])}`
            return url
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
            width: isMobile() ? "100%" : "400px",
            height: isMobile() ? "100%" : "400px",
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
                n = "400px";
            w.style.width = n;
            f.width = n.slice(0, -2);
            var s = f.src.replace(/width=d+px/, "width=" + n);
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
                w.style.width = "400px";
                w.style.height = "400px";
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
        s.textContent = `
            @keyframes botgradient{0%{background-position:0% 50%}100%{background-position:100% 50%}}
        `;
        document.head.appendChild(s);
    </script>



<div class="container">
    <h1>DEPLOY</h1>
    <div class="config-section">
        {#each settings as setting}
            <!-- if it should be a row of buttons -->
            {#if setting.type === "buttons"}
                <div class="field">
                    <div>{setting.label}</div>
                    <div class="button-group">
                        {#each setting.options as option, index}
                            <button 
                                onclick={() => (updateSelection(setting.key, setting.values[index]))}
                               class='{(selections[setting.key] == setting.values[index]) ? "active" : ""}'
                            >
                                {option}
                            </button>
                        {/each}
                    </div>
                </div>
            <!-- if it should be a dropdown -->
            {:else if setting.type === "dropdown"}
                <div class="field">
                    <div>{setting.label}</div>
                    <div class="select-wrapper">
                        <select onchange={(e) => updateSelection(setting.key, (<HTMLTextAreaElement>e.target).value)}>
                            <option value="initial" disabled selected>Please select one</option>
                            {#each setting.options as option, index}
                                <option value={setting.values[index]}>
                                    {option}
                                </option>
                            {/each}
                        </select>
                    </div>
                </div>
            {:else if setting.type === "colorPicker"}
                <div class="field">
                    <div>{setting.label}</div>
                    <div class="select-wrapper">
                        <input type="text" bind:value={selections[setting.key]} onchange={(e) => (updateSelection(setting.key, (<HTMLInputElement>e.target).value))} >
                        <input type="color" bind:value={selections[setting.key]} onchange={(e) => (updateSelection(setting.key, (<HTMLInputElement>e.target).value))}>

                    </div> 
                </div>
            {/if}
        {/each}
    </div>

    <div class="embed-code-section">
        <div>Embed Code</div>
        <textarea readonly >{embedCode}</textarea>
        <button class="copy-button " onclick={() => {navigator.clipboard.writeText(embedCode);}}>COPY EMBED CODE</button>
    </div>
</div>