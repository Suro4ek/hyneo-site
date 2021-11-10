export interface Item{
    id: number,
    name: string,
    price: number,
    desc: string,
    img: string
}

export interface Cart{
    item: Item,
    id: number,
    count: number
}

export interface CartNode{
    total_price: number,
    Cart: Cart[]
}

export function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}

export interface Buy{
    promo: string,
    nickname: string,
    pay: number,
    Cart: Cart[]
}

function getParams(url: string): {[key: string]: string} {
    const i = url.indexOf('?');

    if (i === -1) {
        throw 'No URL parameters in ' + url;
    }

    const result: {[key: string]: string} = {};

    url.substring(i + 1).split('&').forEach(pair => {
        const j = pair.indexOf('=');

        if (j === -1) {
            throw 'No value in key-value pair ' + pair;
        } else {
            const val = pair.substring(j + 1).replace(/\+/g, "%20");

            result[decodeURIComponent(pair.substring(0, j))] = decodeURIComponent(val);
        }
    });

    return result;
}

function createForm(url: string) {
    const params = getParams(url);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = url.substring(0, url.indexOf('?'));

    Object.entries(params).forEach(e => {
        const input = document.createElement("input");
        input.name = e[0];
        input.value = e[1];
        form.appendChild(input);
    });

    return form;
}


export function submitPostForm(url: string): void {
    const form = createForm(url);

    document.body.appendChild(form);

    form.submit();
}