"use server"

type props = {
    imageurl?: string;
    name: string;
    slug: string;
    invite_code: string;
}

const createWorkspace = async ({ imageurl, name, slug, invite_code }: props) => {
    console.log(imageurl, name, slug, invite_code);

}

export default createWorkspace
