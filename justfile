default: build

build:
    @deno compile \
        --allow-read \
        --allow-write=C:\\elden_ring_backups \
        --allow-env \
        --target=x86_64-pc-windows-msvc \
        main.ts
