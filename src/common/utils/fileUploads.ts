import { HttpException, HttpStatus } from '@nestjs/common';

export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Only jpg, jpeg, or png files are allowed!',
        },
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }

  if (file.size > 1024 * 1024 * 2) {
    return callback(
      new HttpException(
        {
          statusCode: HttpStatus.PAYLOAD_TOO_LARGE,
          error: 'Payload Too Large',
          message: 'File size is too large!',
        },
        HttpStatus.PAYLOAD_TOO_LARGE,
      ),
      false,
    );
  }

  callback(null, true);
};

export const imageFileName = (req: any, file: any, cb: any) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  cb(null, uniqueSuffix + '-' + file.originalname);
};
