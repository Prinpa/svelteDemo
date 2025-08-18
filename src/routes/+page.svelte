<script lang='ts'>
	import type { derived } from "svelte/store";

    // could be using a 2d array to be storing the options,
    //  one as the outwads facing text and the other as the dev eyes one,
    //  but considering this appraoch is checking the value and doing somehting, i see no point overcomplicating that
    let agent: string = $state("") ;
    let agentOptions = ["Agent 1", "Agent 2"]
    
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
    
    function updateAgent(value: string) {
        agent = value;
    }
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

<h1> Deploy</h1>

<div>
    <span>Ai Agent</span> 
    <select bind:value={agent} >
    {#each agentOptions as option}
        <option onclick={() => updateAgent(option)}> {option} </option>
    {/each}
    </select>
</div>
<div>
    <span>Embed type</span> 
    {#each embedTypeOptions as option}
        <button onclick={() => updateEmbedType(option)}> {option} </button>
    {/each}
</div>
<div>
    <span>Chatbot height</span> 
    {#each chatbotHeightOptions as option}
        <button onclick={() => updateChatbotHeight(option)}> {option} </button>
    {/each}
</div>
<div>
    <span>Chatbot width</span> 
    {#each chatbotWidthOptions as option}
        <button onclick={() => updateChatbotWidth(option)}> {option} </button>
    {/each}
</div>
<div>
    <span>Agent swarm</span> 
    {#each agentSwarmOptions as option}
        <button onclick={() => updateAgentSwarm(option)}> {option} </button>
    {/each}
</div>
<div>
    <span>Quick Links</span> 
    {#each quickLinksOptions as option}
        <button onclick={() => updateQuickLinks(option)}> {option} </button>
    {/each}
</div>
<div>
    <span>Welcome Screen</span> 
    {#each welcomeScreenOptions as option}
        <button onclick={() => updateWelcomeScreen(option)}> {option} </button>
    {/each}
</div>


<div>
    <textarea name="EmbedCode">{embedCode}</textarea>
</div>