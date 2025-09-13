// Vite glob import for all assets
const experienceImages = import.meta.glob('/src/assets/images/experience/*', { eager: true });
const projectImages = import.meta.glob('/src/assets/images/projects/*', { eager: true });
const aboutImages = import.meta.glob('/src/assets/images/about/*', { eager: true });
const videos = import.meta.glob('/src/assets/videos/*', { eager: true });

// Helper function to get asset URL from path
export const getAssetUrl = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Try different asset collections
  if (cleanPath.includes('/images/experience/')) {
    const fileName = cleanPath.split('/').pop();
    const key = `/src/assets/images/experience/${fileName}`;
    const module = experienceImages[key] as { default: string } | undefined;
    return module?.default || path;
  }

  if (cleanPath.includes('/images/projects/')) {
    const fileName = cleanPath.split('/').pop();
    const key = `/src/assets/images/projects/${fileName}`;
    const module = projectImages[key] as { default: string } | undefined;
    return module?.default || path;
  }

  if (cleanPath.includes('/images/about/')) {
    const fileName = cleanPath.split('/').pop();
    const key = `/src/assets/images/about/${fileName}`;
    const module = aboutImages[key] as { default: string } | undefined;
    return module?.default || path;
  }

  if (cleanPath.includes('/videos/')) {
    const fileName = cleanPath.split('/').pop();
    const key = `/src/assets/videos/${fileName}`;
    const module = videos[key] as { default: string } | undefined;
    return module?.default || path;
  }

  return path;
};

// Export all assets for direct access if needed
export const assets = {
  experience: Object.fromEntries(
    Object.entries(experienceImages).map(([key, module]) => [
      key.split('/').pop()?.split('.')[0],
      (module as { default: string }).default
    ])
  ),
  projects: Object.fromEntries(
    Object.entries(projectImages).map(([key, module]) => [
      key.split('/').pop()?.split('.')[0],
      (module as { default: string }).default
    ])
  ),
  about: Object.fromEntries(
    Object.entries(aboutImages).map(([key, module]) => [
      key.split('/').pop()?.split('.')[0],
      (module as { default: string }).default
    ])
  ),
  videos: Object.fromEntries(
    Object.entries(videos).map(([key, module]) => [
      key.split('/').pop()?.split('.')[0],
      (module as { default: string }).default
    ])
  )
};