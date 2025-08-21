<script lang='ts'>
    import "../styles.css"
    // Agent options with display names
    let agent: string = $state("Emily") ;
    let agentOptions = ["Emily Lead Gen", "Emily", "Tille", "Emily Shopbot"]
    
    let embedType: string = $state("") ;
    let embedTypeOptions = ["Popup", "Inline"]

    let chatbotHeight: string = $state("") ;
    let chatbotHeightOptions = ["Min", "Mid" , "Max"]

    let chatbotWidth: string = $state("") ;
    let chatbotWidthOptions = ["Min", "Mid" , "Max"]

    let agentSwarm: string = $state("") ;
    let agentSwarmOptions = ["On", "Off"] 

    let quickLinks: string = $state("") ;
    let quickLinksOptions = ["On", "Off"]

    let welcomeScreen: string = $state("") ;
    let welcomeScreenOptions = ["On", "Off"] 

    let embedCode = $derived(agent + embedType + chatbotHeight + chatbotWidth + agentSwarm + quickLinks + welcomeScreen);

    
    function updateEmbedType(value: string) {
        embedType = value;
    }
    function updateChatbotHeight(value: string) {
        chatbotHeight = value;
    }
    function updateChatbotWidth(value: string) {
        chatbotWidth = value;
    }
    function updateAgentSwarm(value: string) {
        agentSwarm = value;
    }
    function updateQuickLinks(value: string) {
        quickLinks = value;
    }
    function updateWelcomeScreen(value: string) {
        welcomeScreen = value;
    }
    function updateEmbedCode(value: string) {
        // Use the values of the the other variables to determine the values of the embed code 
        // e.g if cahtbotheight === "Min" 
    }

</script>

<div class="container">
    <h1>DEPLOY</h1>

    <div class="config-section">
        <div class="field">
            <label for={agent}>AI Agent</label>
            <div class="select-wrapper">
                <select bind:value={agent} name={agent}>
                    {#each agentOptions as option}
                        <option value={option}>{option}</option>
                    {/each}
                </select>
            </div>
        </div>

        <div class="field">
            <div>Embed Type</div>
            <div class="button-group">
                {#each embedTypeOptions as option}
                    <button 
                        class:active={embedType === option}
                        onclick={() => updateEmbedType(option)}
                    >
                        {option}
                    </button>
                {/each}
            </div>
        </div>

        <div class="field">
            <div>Chatbot Height</div>
            <div class="button-group">
                {#each chatbotHeightOptions as option}
                    <button 
                        class:active={chatbotHeight === option}
                        onclick={() => updateChatbotHeight(option)}
                    >
                        {option}
                    </button>
                {/each}
            </div>
        </div>

        <div class="field">
            <div>Chatbot Width</div>
            <div class="button-group">
                {#each chatbotWidthOptions as option}
                    <button 
                        class:active={chatbotWidth === option}
                        onclick={() => updateChatbotWidth(option)}
                    >
                        {option}
                    </button>
                {/each}
            </div>
        </div>

        <div class="field">
            <div>Agent Swarm</div>
            <div class="button-group">
                {#each agentSwarmOptions as option}
                    <button 
                        class:active={agentSwarm === option}
                        onclick={() => updateAgentSwarm(option)}
                    >
                        {option}
                    </button>
                {/each}
            </div>
        </div>

        <div class="field">
            <div>Quick Links</div>
            <div class="button-group">
                {#each quickLinksOptions as option}
                    <button 
                        class:active={quickLinks === option}
                        onclick={() => updateQuickLinks(option)}
                    >
                        {option}
                    </button>
                {/each}
            </div>
        </div>

        <div class="field">
            <div>Welcome Screen</div>
            <div class="button-group">
                {#each welcomeScreenOptions as option}
                    <button 
                        class:active={welcomeScreen === option}
                        onclick={() => updateWelcomeScreen(option)}
                    >
                        {option}
                    </button>
                {/each}
            </div>
        </div>
    </div>

    <div class="embed-code-section">
        <div>Embed Code</div>
        <textarea readonly>{embedCode}</textarea>
        <button class="copy-button">COPY EMBED CODE</button>
    </div>
</div>