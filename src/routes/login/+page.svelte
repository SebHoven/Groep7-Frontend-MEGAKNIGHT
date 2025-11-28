<script>
    import { goto } from '$app/navigation';
    // Ensure this path is correct based on where you saved the component
    import LoginCard from '$lib/components/LoginCard.svelte'; 

    // Reactive variables for the form inputs
    let email = '';
    let password = '';
    
    // State for displaying messages to the user
    let message = '';
    let isError = false;

    // Function to handle the form submission
    function handleSubmit() {
        // Basic validation
        if (!email || !password) {
            message = 'Please enter both email and password.';
            isError = true;
            return;
        }
        
        // Simulate an asynchronous API call to authenticate
        
        // Simple simulated check:
        if (email === '4@4.com' && password === '4444') {
            message = 'Login successful! Redirecting...';
            isError = false;
            console.log('Login successful for:', email);

            // *** REDIRECTION LOGIC ***
            setTimeout(() => {
                goto('/student/home');
            }, 1500); // Wait 1.5 seconds to display the success message

        } else {
            message = 'Invalid email or password.';
            isError = true;
            console.log('Login failed for:', email);
        }
        
        // Clear the password field after attempt (good practice)
        password = '';
    }
</script>

<main>
    <LoginCard 
        
        bind:email={email}
        bind:password={password}
        
        message={message}
        isError={isError}
        
        on:submit={handleSubmit}
    />
</main>

