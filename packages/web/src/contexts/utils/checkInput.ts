export default function isValid(input: "userName" | "password" | "email", value: string): true | false {
  const pattern = {
    userName: /^[\w]+$/,
    email: /^[^\.@]([#!%$‘&+*–/=?\^`{|}~\.\w](?!\.\.)){0,64}@([\w\.-](?!\.\.)){0,63}[^-\.]$/,
    password: /^[a-z0-9]+$/i,
  }
  
  return !value.length ? true : pattern[input].test(value)
}