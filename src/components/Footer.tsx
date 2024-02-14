import { Button } from '@nextui-org/button'
import { VscGithubInverted } from 'react-icons/vsc'

export const Footer = () => {
  return (
    <div className='relative bottom-5 pl-8 w-fit'>
      <Button
        aria-label='Source Code'
        size='sm'
        radius='lg'
        onClick={() =>
          window.open('https://github.com/skidoodle/iskola-browser')
        }
      >
        <VscGithubInverted size={20} />
      </Button>
    </div>
  )
}
