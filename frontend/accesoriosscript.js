
const buttons = document.querySelectorAll("#accessories-filters button");
const groups = document.querySelectorAll(".accessory-group");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.dataset.type;

        groups.forEach(group => {
            group.classList.add("hidden");
        });

        document.getElementById(type).classList.remove("hidden");
    });
});
