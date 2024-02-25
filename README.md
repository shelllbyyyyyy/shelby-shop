<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/entry-point-community/v6-app">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h1 align="center">Shelby Shop</h1>

  <p align="center">
    A first fullstack app created by me :)
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<h4>Table of Contents</h4>
<ol>
  <li>
    <a href="#about-the-project">About The Project</a>
    <ul>
      <li><a href="#built-with">Built With</a></li>
    </ul>
  </li>
  <li>
    <a href="#getting-started">Getting Started</a>
    <ul>
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#installation">Installation</a></li>
    </ul>
  </li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#roadmap">Roadmap</a></li>
  <li><a href="#contributing">Contributing</a></li>
  <li><a href="#license">License</a></li>
  <li><a href="#acknowledgments">Acknowledgments</a></li>
</ol>

<!-- ABOUT THE PROJECT -->

## About The Project

### It's basically JUST A MONOREPO.

This project is the first e-commerce created by me. So i'm sorry if the code is "Amburadul" 😂.
Fyi i don't have an "IT Background", so this project was made just to proves that people like me can make a thing like this :)

### Built With

- pnpm
- Turborepo
- NextJS
- NestJS
- Prisma
- Supabase

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# ⚠️Sections below are under construction⚠️

<!-- GETTING STARTED -->

## Getting Started

One thing to note is that this stack is _kind of opinionated_, but you are completely free to tweak anything according to your needs and preferences. For example, this stack heavily depends on Supabase for auth and file storage, but you are still free to setup/build your preferred way of handling auth and storage.

The instructions below will mostly cover the default pre-configured frameworks and libraries I personally chose as the starting template of the V6 Stack.

### Prerequisites

- [pnpm](https://pnpm.io/installation)
- [docker](https://www.docker.com/) (optional, for supabase local development)

### Setup and installation

#### 1. Install packages

```sh
$ pnpm install
```

#### 2. Setup env files

Several `.env.template` files have been created for you. Create your own `.env` to be used in your project. Adjust the needed values accordingly.

#### 3. Initialize supabase

To develop using supabase locally, a supabase config is provided inside the `api` app. Navigate to the `api` folder and run

```sh
npx supabase start
```

to start your own local supabase instance through docker. Run

```sh
npx supabase stop
```

inside the `api` folder to shutdown the containers. For more guides and reference please refer to their [official docs](https://supabase.com/docs/guides/cli/local-development).

#### 4. Prisma Migrate

Create a Prisma migration to sync changes in your `schema.prisma` to your database. Navigate to the `db` package and run this command.

```sh
pnpm db:migrate
```

#### 5. Supabase Auth

If you're using supabase's auth service, chances are you also want to store your user's data inside your database's `public` schema. A minimal SQL function and trigger has been provided for you inside `packages/db/supabase/triggers` .

```sql
-- handle_new_users.sql
-- inserts a row into public."Profiles"
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public."Profiles" (id, email, name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

```

Run this query on your database to duplicate a user's data every time a user signs up using supabase auth.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

_Please refer to our non-existent [Documentation](https://example.com)_. We're working on it, I promise.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Separate Prisma Client to a package
- [ ] Separate React Query to a package
- [ ] Properly implement reusable configs
  - [ ] typescript-config
  - [ ] eslint-config
  - [ ] dto

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments and references

- [T3 Stack](https://github.com/t3-oss/create-t3-app)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
