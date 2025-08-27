<script lang='ts'>
    import "../styles.css"
    import { minify } from "terser"

    /* 
    Left to do
    - Have the agent names be pulled from another place on the site, maybe with playwright? 
    - find out the actual difference between the embed types and implement something around that
    - was it meant to be server or client side rendered? I really should start taking notes
    - make copy button actually copy to clipboard
    - look into minify or anothing like library to do what i need
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
        let code = `(function(){
            const e=document.createElement("iframe");
            src="https://chat.moble.io/embed/?config=galuku&amp;`;

        // Add height if selected
        
        Object.entries(selections).forEach(([key, value]) => {
            code += `${key}=${value};`;
        });
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
        <button class="copy-button">COPY EMBED CODE</button>
    </div>
</div>