import { Authentication } from '@/domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoginController implements Controller {
  private readonly emailValitador: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValitador = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      const isValid = this.emailValitador.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
