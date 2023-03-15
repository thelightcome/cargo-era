interface ISchemesOption {
  required?: boolean
  isEmail?: boolean
  min?: number
  max?: number
  password?: boolean
  sameText?: string
  isPhone?: boolean
}

type TypeFields = keyof ISchemesOption

const VALIDATION_SCHEMES = {
  required<T>(v: T): boolean {
    return !!v
  },
  isEmail(v: string): boolean {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
  },
  min(v: string, min: number): boolean {
    return v.length >= min
  },
  max(v: string, max: number): boolean {
    return v.length <= max
  },
  password(v: string): boolean {
    return v.length > 2
    // return /^(?=^.{8,}$)(?=.*[A-Z])(?=.*[a-z]).*$/g.test(v)
  },
  sameText(v: string, value: string): boolean {
    return v === value
  },
  isPhone(v: string): boolean {
    return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(v)
  },
}

export interface IFormValidation {
  validate(value: any, schemes: ISchemesOption): TypeFields[]
  text(value: string): TypeFields[]
  email(value: string): TypeFields[]
  password(value: string): TypeFields[]
  confirmPassword(value: string, same: string): TypeFields[]
  phone(value: string): TypeFields[]
  getError(
    errArray: TypeFields[],
    msgObj: { [key in TypeFields]?: string }
  ): string
}

export default class FormValidation {
  validate(value: any, schemes: ISchemesOption): TypeFields[] {
    return Object.entries(schemes)
      .filter(([key, val]) => {
        return !VALIDATION_SCHEMES[key as TypeFields](value, val as never)
      })
      .reduce((acc, [key, _]) => {
        acc.push(key as TypeFields)
        return acc
      }, [] as TypeFields[])
  }

  text(v: string) {
    return this.validate(v, { max: 300, required: true })
  }

  email(v: string) {
    return this.validate(v, { max: 300, required: true, isEmail: true })
  }

  password(v: string) {
    return this.validate(v, { max: 50, min: 5, required: true, password: true })
  }

  confirmPassword(v: string, s: string) {
    return this.validate(v, { required: true, sameText: s })
  }

  phone(v: string) {
    return this.validate(v, { required: true, isPhone: true })
  }

  getError(
    errArray: TypeFields[],
    msgObj: { [key in TypeFields]?: string }
  ): string {
    return errArray.reduce((acc, val) => {
      return acc + (acc ? ' ' : '') + (msgObj[val] || '')
    }, '')
  }
}
