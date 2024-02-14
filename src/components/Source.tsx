import { Button } from '@nextui-org/button'
import { VscGithubInverted } from 'react-icons/vsc'

export const Source = () => {
  return (
    <div className='absolute top-0 right-4 p-8'>
      <Button
        aria-label='Source Code'
        size='lg'
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
