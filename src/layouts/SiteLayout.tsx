/* eslint-disable @next/next/no-img-element, jsx-a11y/click-events-have-key-events */
import { Dialog, Transition } from '@headlessui/react'
import { QuestionMarkCircleIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { Bars3Icon, LifebuoyIcon, XMarkIcon } from '@heroicons/react/24/outline'
import * as React from 'react'

export interface LayoutProps {
  showCategoriesList?: boolean
}

interface SiteLayoutProps extends Omit<LayoutProps, 'Layout'> {
  children: React.ReactNode
  showCategoriesList?: boolean
}

/**
 * SiteLayout
 */
export function SiteLayout({ children, showCategoriesList = true }: SiteLayoutProps) {
  const navIsOpen = true
  const setNavIsOpen = (value: boolean) => {
    console.log(`SiteLayout.setNavIsOpen() called value=${value}`)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Transition.Root show={navIsOpen} as={React.Fragment}>
        <Dialog as="div" static className="fixed inset-0 z-40 flex md:hidden" open={navIsOpen} onClose={setNavIsOpen}>
          <Transition.Child
            as={React.Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter=" ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave=" ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex flex-col flex-1 w-full max-w-xs bg-navigation-sidebar">
              <Transition.Child
                as={React.Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setNavIsOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              {/* Mobile Sidebar navigation */}
              <div className="flex-1 pt-5 pb-4 overflow-y-auto sh-0">
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden border-r bg-navigation-sidebar border-navigation-splitter md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-1 h-0">
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
             Application Name
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <div className="pt-1 pl-1 md:hidden sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 outline-none focus:ring-2 focus:ring-inset focus:ring-navigation-500"
            onClick={() => setNavIsOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        {showCategoriesList ? <p>Display list of categories</p> : null}
        <div>Icons <QuestionMarkCircleIcon /> <Squares2X2Icon /> <LifebuoyIcon /></div>
        <main className="relative z-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export const getLayout = (page: React.ReactNode) => <>{page}</>

export default SiteLayout
