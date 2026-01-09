<script>
    import RabbitForm from '$lib/components/RabbitForm.svelte';
    import {page} from '$app/stores';
</script>

<RabbitForm rabbitId={$page.params.rabbit}></RabbitForm>
