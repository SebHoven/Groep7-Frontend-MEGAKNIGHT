<script>
    import { goto } from '$app/navigation';
    import LoginCard from '$lib/components/LoginCard.svelte'; 
    import { authService } from '$lib/services/loginService';

    let email = '';
    let password = '';
    let error = '';
    let loading = false;

    async function handleSubmit() {
        if (!email || !password) {
            error = 'Please enter both email and password.';
            return;
        }
        
        error = '';
        loading = true;
        
        try {
            const result = await authService.login(email, password);
            
            if (result.success) {
                // Role-based redirect
                if (result.role === 'teacher') {
                    goto('/teacher/home');
                } else {
                    goto('/student/home');
                }
            } else {
                error = result.message || 'Invalid email or password.';
            }
        } catch (err) {
            error = 'Network error. Please make sure the backend is running.';
            console.error('Login error:', err);
        } finally {
            loading = false;
            password = '';
        }
    }
</script>

<main>
    <LoginCard 
        bind:email={email}
        bind:password={password}
        message={error}
        isError={!!error}
        isLoading={loading}
        on:submit={handleSubmit}
    />
</main>