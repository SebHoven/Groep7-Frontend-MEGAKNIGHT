<script>
    import { createEventDispatcher } from 'svelte';

    export let message = '';
    export let isError = false;
    export let name = '';
    export let email = '';
    export let password = '';
    export let confirmPassword = '';
    export let role = 'student';
    export let isLoading = false;

    const dispatch = createEventDispatcher();

    function handleSubmit() {
        dispatch('submit');
    }
</script>

<div class="register-wrapper">
    <div class="register-container">
        <h2>Create Account</h2>
        
        <div class="space-y-6">
            <div>
                <label for="role">I am a</label>
                <select 
                    id="role" 
                    bind:value={role}
                    disabled={isLoading}
                >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
            </div>

            <div>
                <label for="name">Name</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    bind:value={name}
                    disabled={isLoading}
                    placeholder="John Doe"
                />
            </div>

            <div>
                <label for="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    bind:value={email}
                    disabled={isLoading}
                    placeholder="john@example.com"
                />
            </div>

            <div>
                <label for="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required 
                    bind:value={password}
                    disabled={isLoading}
                    placeholder="At least 8 characters"
                />
            </div>

            <div>
                <label for="confirmPassword">Confirm Password</label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    required 
                    bind:value={confirmPassword}
                    disabled={isLoading}
                    placeholder="Re-enter password"
                />
            </div>

            <button on:click={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Register'}
            </button>
        </div>

        {#if message}
            <div class="message" class:error={isError} class:success={!isError}>
                {message}
            </div>
        {/if}

        <div class="login-link">
            Already have an account? <a href="/login">Log in</a>
        </div>
    </div>
</div>

<style>
    .register-wrapper {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
        padding: 20px;
    }

    .register-container {
        max-width: 480px;
        width: 100%;
        padding: 30px; 
        border: 1px solid #c8e6c9; 
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color: #f0fdf4; 
    }

    h2 {
        text-align: center;
        color: #2e7d32;
        margin-bottom: 25px;
        font-size: 1.8em;
    }

    .space-y-6 > * + * {
        margin-top: 20px;
    }

    label {
        display: block;
        margin-bottom: 7px;
        font-weight: bold;
        color: #388e3c;
        font-size: 1.05em;
    }

    input, select {
        width: 100%;
        padding: 12px;
        border: 1px solid #a5d6a7;
        border-radius: 4px;
        font-size: 17px;
        background-color: #ffffff;
    }

    input:disabled, select:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
    }

    button {
        width: 100%;
        padding: 12px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 18px;
        transition: background-color 0.3s ease;
    }

    button:hover:not(:disabled) {
        background-color: #388E3C;
    }

    button:disabled {
        background-color: #a5d6a7;
        cursor: not-allowed;
    }

    .message {
        padding: 10px;
        margin-top: 20px;
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

    .login-link {
        text-align: center;
        margin-top: 20px;
        color: #388e3c;
        font-size: 0.95em;
    }

    .login-link a {
        color: #2e7d32;
        font-weight: bold;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .login-link a:hover {
        color: #1b5e20;
        text-decoration: underline;
    }
</style>