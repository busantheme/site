<script>
    let { data, form } = $props();
</script>

<div class="container py-5">
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/admin">Admin</a></li>
            <li class="breadcrumb-item active">Ports</li>
        </ol>
    </nav>

    <h1 class="mb-4">Manage Ports</h1>

    {#if data.redisMissing}
        <div class="alert alert-warning">
            Redis is not configured for this project. Connect a Redis integration (Upstash) and set
            <code>UPSTASH_REDIS_REST_URL</code> and <code>UPSTASH_REDIS_REST_TOKEN</code>.
        </div>
    {/if}

    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">Add New Port</h5>
                </div>
                <div class="card-body">
                    <form method="POST" action="?/add">
                        {#if form?.error}
                            <div class="alert alert-danger">{form.error}</div>
                        {/if}
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" name="name" required disabled={data.redisMissing}>
                        </div>
                        <div class="mb-3">
                            <label for="url" class="form-label">URL</label>
                            <input type="url" class="form-control" id="url" name="url" placeholder="https://example.com" required disabled={data.redisMissing}>
                        </div>
                        <button type="submit" class="btn btn-primary" disabled={data.redisMissing}>Add Port</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-md-8">
            <h5>Existing Ports</h5>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>URL</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each data.ports as port}
                        <tr>
                            <td>{port.id}</td>
                            <td>{port.name}</td>
                            <td><a href={port.url} target="_blank">{port.url}</a></td>
                            <td>
                                <form method="POST" action="?/delete" style="display: inline;">
                                    <input type="hidden" name="id" value={port.id}>
                                    <button type="submit" class="btn btn-sm btn-danger" disabled={data.redisMissing}>Delete</button>
                                </form>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>
