<script>
    let { data, form } = $props();
</script>

<div class="container py-5">
    <h1 class="mb-4">Admin</h1>
    
    {#if !data.loggedIn}
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">Login</h5>
                    </div>
                    <div class="card-body">
                        <form method="POST" action="?/login">
                            {#if form?.error}
                                <div class="alert alert-danger">{form.error}</div>
                            {/if}
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" name="password" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    {:else}
        <div class="alert alert-success">Logged in as admin</div>
        <div class="list-group">
            <a href="/admin/ports" class="list-group-item list-group-item-action">Manage Ports</a>
        </div>
        <form method="POST" action="?/logout" class="mt-3">
            <button type="submit" class="btn btn-outline-danger">Logout</button>
        </form>
    {/if}
</div>
