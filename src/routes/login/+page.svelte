<script>
    import { goto } from '$app/navigation';
    import LoginCard from '$lib/components/LoginCard.svelte'; 
    import { authService } from '$lib/services/loginService';

    // Reactive variables for the form inputs
    let email = '';
    let password = '';
    
    // State for displaying messages to the user
    let message = '';
    let isError = false;
    let isLoading = false;

    // Function to handle the form submission
    async function handleSubmit() {
        // Basic validation
        if (!email || !password) {
            message = 'Please enter both email and password.';
            isError = true;
            return;
        }
        
        isLoading = true;
        message = '';
        
        try {
            // Call the backend API
            const result = await authService.login(email, password);
            
            if (result.success) {
                message = 'Login successful! Redirecting...';
                isError = false;
                console.log('Login successful for:', email);

                // Redirect after success
                setTimeout(() => {
                    goto('/student/home');
                }, 1500);
            } else {
                message = result.message || 'Invalid email or password.';
                isError = true;
                console.log('Login failed for:', email);
            }
        } catch (error) {
            message = 'Network error. Please make sure the backend is running.';
            isError = true;
            console.error('Login error:', error);
        } finally {
            isLoading = false;
            // Clear the password field after attempt
            password = '';
        }
    }
</script>

<main>
    <LoginCard 
        bind:email={email}
        bind:password={password}
        message={message}
        isError={isError}
        isLoading={isLoading}
        on:submit={handleSubmit}
    />
</main>