export const isParentActive = (item, path) => {
    if (!item.dropdown && !path) return false;

    if (item.dropdown) {
        return item.dropdown.some(
            (child) =>
                child?.url === path ||
                child?.dropdown?.some((subChild) => subChild?.url === path)
        );
    }
};
