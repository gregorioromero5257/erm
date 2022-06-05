const calculate_color_class = (color) => {
    if(color === 'success') {
        return {
            'bg-emerald-500' : true,
            'dark:bg-emerald-400' : true,
        }
    } else if(color === 'danger'){
        return {
            'bg-rose-500' : true,
            'dark:bg-rose-400' : true,
        }
    } else if(color === 'warning'){
        return {
            'bg-amber-500' : true,
            'dark:bg-amber-400' : true,
        }
    } else {
        return {
            'bg-gray-300' : true,
            'dark:bg-gray-400' : true,
        }
    }
}

export default calculate_color_class