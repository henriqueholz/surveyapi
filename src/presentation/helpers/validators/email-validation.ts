import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator } from '@/presentation/protocols'
import { Validation } from '../../protocols/validation'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input)
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
