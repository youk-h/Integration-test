export interface GetCarParams {
  name: string;
}

export interface PostCarParams {
  name: string;
  maker: string;
}

export interface PutCarParams {
  oldName: string;
  name: string;
  maker: string;
}

export interface DeleteCarParams {
  name: string;
}
