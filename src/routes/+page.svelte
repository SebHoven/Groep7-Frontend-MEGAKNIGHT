<script>
    import { goto } from '$app/navigation';
    import { authService } from '$lib/services/loginService';

    let activeTab = 'login';
    
    // Login state
    let loginEmail = '';
    let loginPassword = '';
    let loginError = '';
    let loginLoading = false;

    // Register state
    let registerName = '';
    let registerEmail = '';
    let registerPassword = '';
    let registerConfirmPassword = '';
    let registerRole = 'student';
    let registerMessage = '';
    let registerIsError = false;
    let registerLoading = false;

    async function handleLogin() {
        if (!loginEmail || !loginPassword) {
            loginError = 'Please enter both email and password.';
            return;
        }
        
        loginError = '';
        loginLoading = true;
        
        try {
            const result = await authService.login(loginEmail, loginPassword);
            
            if (result.success) {
                // Role-based redirect
                if (result.role === 'teacher') {
                    goto('/teacher/home');
                } else {
                    goto('/student/home');
                }
            } else {
                loginError = result.message || 'Invalid email or password.';
            }
        } catch (err) {
            loginError = 'Network error. Please make sure the backend is running.';
            console.error('Login error:', err);
        } finally {
            loginLoading = false;
            loginPassword = '';
        }
    }

    async function handleRegister() {
        if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
            registerMessage = 'Vul alsjeblieft alle velden in.';
            registerIsError = true;
            return;
        }

        if (registerPassword !== registerConfirmPassword) {
            registerMessage = 'Wachtwoorden komen niet overeen.';
            registerIsError = true;
            return;
        }

        if (registerPassword.length < 8) {
            registerMessage = 'Wachtwoord moet minstens 8 tekens zijn.';
            registerIsError = true;
            return;
        }
        
        registerLoading = true;
        registerMessage = '';
        
        try {
            // @ts-ignore
            const result = await authService.register(registerName, registerEmail, registerPassword, registerRole);
            
            if (result.success) {
                registerMessage = 'Registratie successvol! Naar de login...';
                registerIsError = false;

                setTimeout(() => {
                    activeTab = 'login';
                    registerName = '';
                    registerEmail = '';
                    registerPassword = '';
                    registerConfirmPassword = '';
                }, 1500);
            } else {
                registerMessage = result.message || 'Registratie mislukt.';
                registerIsError = true;
            }
        } catch (error) {
            registerMessage = 'Netwerk fout. Probeer het later opnieuw.';
            registerIsError = true;
            console.error('Registration error:', error);
        } finally {
            registerLoading = false;
            registerPassword = '';
            registerConfirmPassword = '';
        }
    }
</script>

<main>
    <div class="auth-wrapper">
        <div class="auth-container">
            <div class="logo-section">
                <div class="logo">🌿</div>
                <h1>Groen Schoolplein</h1>
                <p class="subtitle">Log in of maak een nieuwe account aan</p>
            </div>

            <div class="tabs">
                <button 
                    class="tab-button" 
                    class:active={activeTab === 'login'}
                    on:click={() => activeTab = 'login'}
                >
                    Inloggen
                </button>
                <button 
                    class="tab-button" 
                    class:active={activeTab === 'register'}
                    on:click={() => activeTab = 'register'}
                >
                    Registreren
                </button>
            </div>

            {#if activeTab === 'login'}
                <div class="form-section">
                    <form on:submit|preventDefault={handleLogin}>
                        <div class="form-group">
                            <label for="login-email">Email</label>
                            <input 
                                type="email" 
                                id="login-email" 
                                name="email" 
                                required 
                                bind:value={loginEmail}
                                disabled={loginLoading}
                            />
                        </div>

                        <div class="form-group">
                            <label for="login-password">Wachtwoord</label>
                            <input 
                                type="password" 
                                id="login-password" 
                                name="password" 
                                required 
                                bind:value={loginPassword}
                                disabled={loginLoading}
                            />
                        </div>

                        <button type="submit" class="submit-button" disabled={loginLoading}>
                            {loginLoading ? 'Bezig met inloggen...' : 'Inloggen'}
                        </button>
                    </form>

                    {#if loginError}
                        <div class="message error">
                            {loginError}
                        </div>
                    {/if}
                </div>
            {/if}

            {#if activeTab === 'register'}
                <div class="form-section">
                    <form on:submit|preventDefault={handleRegister}>
                        <div class="form-group">
                            <label for="register-name">Naam</label>
                            <input 
                                type="text" 
                                id="register-name" 
                                name="name" 
                                required 
                                bind:value={registerName}
                                disabled={registerLoading}
                            />
                        </div>

                        <div class="form-group">
                            <label for="register-email">Email</label>
                            <input 
                                type="email" 
                                id="register-email" 
                                name="email" 
                                required 
                                bind:value={registerEmail}
                                disabled={registerLoading}
                            />
                        </div>

                        <div class="form-group">
                            <label for="register-password">Wachtwoord</label>
                            <input 
                                type="password" 
                                id="register-password" 
                                name="password" 
                                required 
                                bind:value={registerPassword}
                                disabled={registerLoading}
                            />
                        </div>

                        <div class="form-group">
                            <label for="register-confirm">Wachtwoord herhalen</label>
                            <input 
                                type="password" 
                                id="register-confirm" 
                                name="confirmPassword" 
                                required 
                                bind:value={registerConfirmPassword}
                                disabled={registerLoading}
                            />
                        </div>

                        <div class="form-group">
                            <label>Account type</label>
                            <div class="radio-group">
                                <label class="radio-label">
                                    <input 
                                        type="radio" 
                                        value="student" 
                                        bind:group={registerRole}
                                        disabled={registerLoading}
                                    />
                                    Leerling
                                </label>
                                <label class="radio-label">
                                    <input 
                                        type="radio" 
                                        value="teacher" 
                                        bind:group={registerRole}
                                        disabled={registerLoading}
                                    />
                                    Leraar
                                </label>
                            </div>
                        </div>

                        <button type="submit" class="submit-button" disabled={registerLoading}>
                            {registerLoading ? 'Bezig met registreren...' : 'Registreren'}
                        </button>
                    </form>

                    {#if registerMessage}
                        <div class="message" class:error={registerIsError} class:success={!registerIsError}>
                            {registerMessage}
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
</main>

<style>
    main {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
        padding: 20px;
    }

    .auth-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .auth-container {
        max-width: 480px;
        width: 100%;
        padding: 30px;
        border: 1px solid #c8e6c9;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color: #f0fdf4;
    }

    .logo-section {
        text-align: center;
        margin-bottom: 30px;
    }

    .logo {
        font-size: 3em;
        margin-bottom: 10px;
    }

    h1 {
        color: #2e7d32;
        margin: 0 0 5px 0;
        font-size: 1.5em;
    }

    .subtitle {
        color: #666;
        font-size: 0.9em;
        margin: 0;
    }

    .tabs {
           display: flex;
           gap: 10px;
           margin-bottom: 25px;
           background-color: #e8f5e9;
           padding: 5px;
           border-radius: 50px;
    }

    .tab-button {
           flex: 1;
           padding: 10px 20px;
           background: transparent;
           border: none;
           color: #666;
           font-size: 1em;
           font-weight: 500;
           cursor: pointer;
           transition: all 0.3s ease;
           border-radius: 50px;
    }

    .tab-button.active {
           color: white;
           background-color: #4CAF50;
    }

    .tab-button:hover:not(.active) {
           color: #2e7d32;
    }

    .form-section {
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    label {
        margin-bottom: 7px;
        font-weight: bold;
        color: #388e3c;
        font-size: 0.95em;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"] {
        padding: 12px;
        border: 1px solid #a5d6a7;
           border-radius: 12px;
        font-size: 16px;
        background-color: #ffffff;
        transition: border-color 0.3s ease;
    }

    input[type="text"]:focus,
    input[type="email"]:focus,
    input[type="password"]:focus {
        outline: none;
        border-color: #4CAF50;
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
    }

    input:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
    }

    .radio-group {
        display: flex;
        gap: 15px;
    }

    .radio-label {
        display: flex;
        align-items: center;
        font-weight: normal;
        cursor: pointer;
        gap: 8px;
        margin: 0;
    }

    .radio-label input[type="radio"] {
        cursor: pointer;
        accent-color: #4CAF50;
    }

    .submit-button {
        padding: 12px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        font-size: 1em;
        font-weight: 600;
        transition: background-color 0.3s ease;
    }

    .submit-button:hover:not(:disabled) {
        background-color: #388E3C;
    }

    .submit-button:disabled {
        background-color: #a5d6a7;
        cursor: not-allowed;
    }

    .message {
        padding: 12px;
        border-radius: 4px;
        text-align: center;
        font-weight: 500;
        margin-top: 15px;
    }

    .message.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .message.success {
        background-color: #e6ffed;
        color: #1a6438;
        border: 1px solid #b7e6c9;
    }
</style>