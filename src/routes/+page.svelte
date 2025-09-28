<script lang='ts' src="jscolor.js">
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
    https://chat.moble.io/embed/?config=galuku&avatar_left_align=1&background_color=%23ff0000&height=492px&width=900px&shadow=0&no_avatar=1&border_round=1&include_personas=1&include_buttons=&use_voice=&v=1014&color_1=%23eef0e1&input_background_color=%23eef0e1&question_background_color=%23eef0e1e6&color_2=%23006fde&input_color=%23006fde&placeholder_color=%23006fde99&question_color=%23006fde&action_2_background_color_1=%23006fde&action_2_background_color_2=%23006fde&action_1_background_color_1=%23006fde&action_1_background_color_2=%23006fde&answer_background_color=%23006fde&color_3=%23e60be6&button_border_color=%23e60be6&button_background_color=%23e60be6&color_4=%23ff6600
    130deg

    after: 

    https://nora.moble.site
    inline to slide in

    make the current site dyan
    */


    // State object to track selections for each option
    let selections: Record<string, string> = $state({});

    onMount(() => {
        // populate selections
        settings.forEach(setting => {
            selections[setting.key] = setting.values[0];
        });

    })
    function updateSelection(optionName: string, value: string) {
        selections[optionName] = value;
    }



    let embedCode = $derived.by(() => {
        return generateEmbedCode(selections);;
    });

        
           
    

    
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