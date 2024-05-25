import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import Handlebars from 'handlebars'

// For dev local
// import * as exphbs from 'express-handlebars';
// import * as cookieParser from 'cookie-parser';

// For hosting on vercel
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  app.use(cookieParser());

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))

  app.engine(
    'hbs',
    exphbs({
      extname: 'hbs',
      partialsDir: join(__dirname, '..', 'views/partials'),
      defaultLayout: 'main.hbs',
    }),
  )

  Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
  })

  app.setViewEngine('hbs')

  await app.listen(3000)
}
bootstrap()