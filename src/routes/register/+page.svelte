<script>
    import { goto } from '$app/navigation';
    import RegisterCard from '$lib/components/RegisterCard.svelte';
    import { authService } from '$lib/services/loginService';

    let name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let role = 'student';
    
    let message = '';
    let isError = false;
    let isLoading = false;

    async function handleRegister() {
        if (!name || !email || !password || !confirmPassword) {
            message = 'Vul alsjeblieft alle velden in.';
            isError = true;
            return;
        }

        if (password !== confirmPassword) {
            message = 'Wachtwoorden komen niet overeen.';
            isError = true;
            return;
        }

        if (password.length < 8) {
            message = 'Wachtwoord moet minstens 8 tekens zijn.';
            isError = true;
            return;
        }
        
        isLoading = true;
        message = '';
        
        try {
            // @ts-ignore
            const result = await authService.register(name, email, password, role);
            
            if (result.success) {
                message = 'Registratie successvol! Naar de login...';
                isError = false;

                setTimeout(() => {
                    goto('/');
                }, 1500);
            } else {
                message = result.message || 'Registratie mislukt.';
                isError = true;
            }
        } catch (error) {
            message = 'Netwerk fout. Probeer het later opnieuw.';
            isError = true;
            console.error('Registration error:', error);
        } finally {
            isLoading = false;
            password = '';
            confirmPassword = '';
        }
    }
</script>

<main>
    <RegisterCard 
        bind:name={name}
        bind:email={email}
        bind:password={password}
        bind:confirmPassword={confirmPassword}
        bind:role={role}
        message={message}
        isError={isError}
        isLoading={isLoading}
        on:submit={handleRegister}
    />
</main>
