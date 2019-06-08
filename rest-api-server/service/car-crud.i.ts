export interface GetCarParams {
  name: string;
}

export interface GetCarResult {
  name: string;
  maker: string;
}

export interface PostCarParams {
  name: string;
  maker: string;
}

export interface PostCarResult {
  name: string;
  maker: string;
}

export interface PutCarParams {
  oldName: string;
  name: string;
  maker: string;
}

export interface PutCarResult {
  name: string;
  maker: string;
}

export interface DeleteCarParams {
  name: string;
}

export interface DeleteCarResult {
  name: string;
}
