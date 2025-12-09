<script>
    import { createEventDispatcher } from 'svelte';

    // 1. Define props for message and error state (from previous response)
    export let message = '';
    export let isError = false;

    // 2. Define props for the input values (NEW: so the parent can control them)
    export let email = '';
    export let password = '';

    // 3. Create a dispatcher to notify the parent when the form is submitted
    const dispatch = createEventDispatcher();

    function handleSubmit() {
        // Dispatch an event to the parent. The parent's handleSubmit function 
        // will be called when it listens for this event.
        dispatch('submit');
    }
</script>

<div class="login-container">
    <h2>Login</h2>
    
    <form on:submit|preventDefault={handleSubmit}>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required bind:value={email} />

        <label for="password">Password</label>
        <input type="password" id="password" name="password" required bind:value={password} />

        <button type="submit">Log In</button>
    </form>

    {#if message}
        <div class="message" class:error={isError} class:success={!isError}>
            {message}
        </div>
    {/if}
</div>

<style>
   /* Component-scoped CSS for styling with a green theme */
.login-container {
    /* --- Size Increase --- */
    max-width: 480px; 
    padding: 30px; 
    border: 1px solid #c8e6c9; 
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f0fdf4; 
}

h2 {
    text-align: center;
    color: #2e7d32;
    margin-bottom: 25px; /* Slightly more space */
    font-size: 1.8em; /* Slightly larger heading */
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 7px; /* Slightly more space */
    font-weight: bold;
    color: #388e3c;
    font-size: 1.05em; /* Slightly larger label text */
}

input {
    padding: 12px; /* Increased padding */
    margin-bottom: 20px; /* Increased margin */
    border: 1px solid #a5d6a7;
    border-radius: 4px;
    font-size: 17px; /* Slightly larger input text */
    background-color: #ffffff;
}

button {
    padding: 12px; /* Increased padding */
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px; /* Slightly larger button text */
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #388E3C;
}

.message {
    padding: 10px;
    margin-top: 20px; /* Increased margin */
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
}

.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.success {
    background-color: #e6ffed;
    color: #1a6438;
    border: 1px solid #b7e6c9;
}
</style>