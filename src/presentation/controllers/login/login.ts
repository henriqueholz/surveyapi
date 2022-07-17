import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoginController implements Controller {
  private readonly emailValitador: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValitador = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
    if (!httpRequest.body.password) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }
    const isValid = this.emailValitador.isValid(httpRequest.body.email)
    if (!isValid) {
      return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
    }
  }
}
