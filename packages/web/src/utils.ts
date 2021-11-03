type typeObj = {
  [index: string]: string | {
    [index: string]: string | {
      [index: string]: string
    }
  }
}

export function getObjectCopy(obj: typeObj): typeObj {
  const newObj: typeObj = {}

/*authError: {
  [index: string]: {
    input: string,
    error: string
  }
}

state: {
  form: {
    login?: {
      [typeInput: string]: string
    },
    register?: {
      [typeInput: string]: string
    }
  }
} */
  // "form" | [index: string]
  for (const prop of Object.keys(obj)) {
    if (typeof obj[prop] === 'object') {
      newObj[prop] = {}
      // ["login", "register"]
      for (const i of Object.keys(obj[prop])) {
        if (typeof obj[prop][i] === 'object') {
          newObj[prop][i] = { ...obj[prop][i] }
        } else {
          newObj[prop][i] = obj[prop][i]
        }
      }
    } else {
      // authError[index: string]
      newObj[prop] = obj[prop]
    }
  }

  return newObj
}