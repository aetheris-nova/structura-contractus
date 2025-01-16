enum ErrorCodeEnum {
  // general
  UnknownError = 1000,
  // world
  WorldDataNotFoundError = 2000,
  // account
  NoAccountConnectedError = 3000,
  AccountNotACharacterError = 3001,
  // smart assemblies
  SmartAssemblyNotFoundError = 4000,
}

export default ErrorCodeEnum;
