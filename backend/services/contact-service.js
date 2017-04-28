
let _list = [{id: 1, first_name: 'John', last_name: 'Smith', email: 'test@gmail.com', description: 'about me'}]

export default class ContactService {
    
    constructor() {
    }

    getAll() {
        return _list
    }

    get(id) {
        return _list.find(it => it.id === id)
    }

    delete(id) {
        for (let i in _list) {
            if (_list[i].id === id) {
                _list.splice(i, 1)
                break
            }
        }
    }

    add(data) {
        data.id = Math.max(0, ..._list.map(it => it.id)) + 1
        _list.push(data)
        return data.id
    }

    update(id, data) {
		console.log("id : " + id);
		console.log("data : " + data);

        let item = this.get(id)
        item.first_name = data.first_name
        item.last_name = data.last_name
        item.email = data.email
        item.description = data.description
    }
}