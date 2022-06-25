/**
   * Create By zahwazein
   * Contact -
   * Follow https://github.com/zhwzein
*/

const fs = require("fs")

const addRpg = (userId, _db) => {
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
            position = true
        }
    })
    if (position === false) {
        const obj = { 
			id: userId, 
			fish: 0,
			batu: 0,
            permata: 0,
            emas: 0,
            berlian: 0
		}
        _db.push(obj)
        fs.writeFileSync('./database/rpg.json', JSON.stringify(_db, null, 4))
        return false
    }
}

const addIkan = (userId, amount, _db) => {
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
            position = i
        }
    })
    if (position !== false) {
        _db[position].fish += amount
        fs.writeFileSync('./database/rpg.json', JSON.stringify(_db, null, 4))
    }
}
const getIkan = (userId, _db) => {
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
            position = i
        }
    })
    if (position !== false) {
        return _db[position].fish
    } else {
		return 0
	}
}

// const jualIkan = (userId, amount) => {
//     let position = false
//     Object.keys(ikan).forEach((i) => {
//         if (ikan[i].id === userId) {
//             position = i
//         }
//     })
//     if (position !== false) {
//         ikan[position].fish -= amount
//         fs.writeFileSync('./database/user/uang.json', JSON.stringify(uang))
//     }
// }

const addBatu = (userId, amount, _db) => {
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
        position = i
        }
    })
    if (position !== false) {
        _db[position].batu += amount
        fs.writeFileSync('./database/rpg.json', JSON.stringify(_db, null, 4))
    }
}
const getBatu = (userId, _db) => {
    let position = false 
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
            position = i
        }
    })
    if (position !== false) {
        return _db[position].batu
	} else {
		return 0
	}
}

const jualBatu = (userId, amount, _db) => {
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
            position = i
        }
    })
    if (position !== false) {
        _db[position].batu -= amount
        fs.writeFileSync('./database/rpg.json', JSON.stringify(_db, null, 4))
    }
}

const addPermata = (userId, amount, _db) => {
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
        position = i
        }
    })
    if (position !== false) {
        _db[position].permata += amount
        fs.writeFileSync('./database/rpg.json', JSON.stringify(_db, null, 4))
    }
}

const getPermata = (userId, _db) => {
    let position = false 
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
            position = i
        }
    })
    if (position !== false) {
        return _db[position].permata
	} else {
		return 0
	}
}

const addEmas = (userId, amount, _db) => {
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
        position = i
        }
    })
    if (position !== false) {
        _db[position].emas += amount
        fs.writeFileSync('./database/rpg.json', JSON.stringify(_db, null, 4))
    }
}
const getEmas = (userId, _db) => {
    let position = false 
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
            position = i
        }
    })
    if (position !== false) {
        return _db[position].emas
	} else {
		return 0
	}
}

const addBerlian = (userId, amount, _db) => {
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
        position = i
        }
    })
    if (position !== false) {
        _db[position].berlian += amount
        fs.writeFileSync('./database/rpg.json', JSON.stringify(_db, null, 4))
    }
}
const getBerlian = (userId, _db) => {
    let position = false 
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
            position = i
        }
    })
    if (position !== false) {
        return _db[position].berlian
	} else {
		return 0
	}
}

//END OF MANCING FUNCTION
module.exports = {
    addRpg,
    addIkan,
    getIkan,
    addBatu,
    getBatu,
    jualBatu,
    addPermata,
    getPermata,
    addEmas,
    getEmas,
    addBerlian,
    getBerlian,
}