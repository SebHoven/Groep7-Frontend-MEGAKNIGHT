<script>
    import { goto } from "$app/navigation";

    const submitTask = async () => {
        await postData(baseUrl + '/tasks', {
            name: 'dikke test',
            description: 'nee',
            date: new Date(2025),
            icon: 'leuk',
            xp: 5,
            coordinates: 25,
            teacherId: 1
        });
        goto("/teacher/home");
    };

    const baseUrl='http://localhost:3012';
    const postData = async (url, body) => {
        try {
            let response = await fetch(url, {
                method: "POST", 
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            let data = await response.json();
            return data;
        } catch (ex) {
            console.error(ex);
        }
    };
</script>

<h1>Create your task!</h1>

<h2 class="subtitle is-6 is-italic">
    Please fill out al the form fields and click 'Submit'
</h2>

<form class="p-6 bg-green-100">
    <label for="taskname">Task name</label> <br />
    <input name="taskname" type="text" /> <br />

    <label for="taskdescripton">Task description</label> <br />
    <input name="taskdescription" type="text" /> <br />

    <label for="taskdate">Task date</label> <br />
    <input name="taskdate" type="date" /> <br />

    <label for="taskicon">Task icon</label> <br />
    <input name="taskicon" type="text" /> <br />

    <label for="taskxp">Task xp</label> <br />
    <input name="taskxp" type="number" /> <br />

    <label for="taskcoordinates">Task coordinates</label> <br />
    <input name="taskcoordinates" type="number" /> <br />

    <label for="teacherid">Teacher id</label> <br />
    <input name="teacherid" type="number" /> <br />
</form>

<a
    href="/teacher/home"
    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right m-6"
>
    Back
</a>

<button
    on:click={() => submitTask()}
    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded float-right"
>
    accept
</button>
