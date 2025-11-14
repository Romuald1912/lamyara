document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            galleryItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';

                setTimeout(() => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        const itemCategory = item.getAttribute('data-category');
                        if (itemCategory === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            item.style.display = 'none';
                        }
                    }
                }, 300);
            });
        });
    });

    const zoomButtons = document.querySelectorAll('.btn-zoom');
    zoomButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imageUrl = this.getAttribute('data-image');
            modalImage.src = imageUrl;
        });
    });

    if (imageModal) {
        imageModal.addEventListener('hidden.bs.modal', function() {
            modalImage.src = '';
        });
    }

    galleryItems.forEach(item => {
        item.style.transition = 'all 0.3s ease';
    });
});
