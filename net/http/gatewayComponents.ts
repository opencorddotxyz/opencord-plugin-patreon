export interface LoginRequest {
  code: string;
}

export interface LoginResponse {
  token: string; 
  setup: boolean;
  manageable: boolean;
}


export interface ValidateOAuth2TokenRequest { 
  code: string;
}

export interface ValidateOAuth2TokenResponse { 
  
}