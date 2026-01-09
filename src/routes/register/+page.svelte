<!-- src/routes/register/+page.svelte -->
<script>
    import { goto } from '$app/navigation';
    import RegisterCard from '$lib/components/RegisterCard.svelte';
    import { authService } from '$lib/services/loginService';

    let name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    
    let message = '';
    let isError = false;
    let isLoading = false;

    async function handleRegister() {
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            message = 'Please fill in all fields.';
            isError = true;
            return;
        }

        if (password !== confirmPassword) {
            message = 'Passwords do not match.';
            isError = true;
            return;
        }

        if (password.length < 8) {
            message = 'Password must be at least 8 characters long.';
            isError = true;
            return;
        }
        
        isLoading = true;
        message = '';
        
        try {
            const result = await authService.register(name, email, password);
            
            if (result.success) {
                message = 'Registration successful! Redirecting to login...';
                isError = false;
                console.log('Registration successful for:', email);

                setTimeout(() => {
                    goto('/login');
                }, 1500);
            } else {
                message = result.message || 'Registration failed.';
                isError = true;
                console.log('Registration failed for:', email);
            }
        } catch (error) {
            message = 'Network error. Please make sure the backend is running.';
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
        message={message}
        isError={isError}
        isLoading={isLoading}
        on:submit={handleRegister}
    />
</main>