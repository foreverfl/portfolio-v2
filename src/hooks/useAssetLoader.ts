import { useState, useEffect } from 'react';

// Asset loader hook for dynamic image/video imports
export const useAssetLoader = (assetPath: string | undefined): string => {
  const [assetUrl, setAssetUrl] = useState<string>('');

  useEffect(() => {
    if (!assetPath) return;

    // Convert translation path to asset path
    const cleanPath = assetPath.replace(/^\//, '');

    // Dynamic import based on file extension
    const loadAsset = async () => {
      try {
        if (assetPath.includes('/images/experience/')) {
          const fileName = assetPath.split('/').pop();
          const module = await import(`../assets/images/experience/${fileName}`);
          setAssetUrl(module.default);
        } else if (assetPath.includes('/images/projects/')) {
          const fileName = assetPath.split('/').pop();
          const module = await import(`../assets/images/projects/${fileName}`);
          setAssetUrl(module.default);
        } else if (assetPath.includes('/images/about/')) {
          const fileName = assetPath.split('/').pop();
          const module = await import(`../assets/images/about/${fileName}`);
          setAssetUrl(module.default);
        } else if (assetPath.includes('/videos/')) {
          const fileName = assetPath.split('/').pop();
          const module = await import(`../assets/videos/${fileName}`);
          setAssetUrl(module.default);
        }
      } catch (error) {
        console.warn(`Failed to load asset: ${assetPath}`, error);
        setAssetUrl(assetPath); // Fallback to original path
      }
    };

    loadAsset();
  }, [assetPath]);

  return assetUrl;
};

// Batch asset loader for multiple assets
export const useAssetBatchLoader = (assetPaths: string[]): Record<string, string> => {
  const [assets, setAssets] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadAllAssets = async () => {
      const loadedAssets: Record<string, string> = {};

      for (const path of assetPaths) {
        if (!path) continue;

        try {
          let module;
          if (path.includes('/images/experience/')) {
            const fileName = path.split('/').pop();
            module = await import(`../assets/images/experience/${fileName}`);
          } else if (path.includes('/images/projects/')) {
            const fileName = path.split('/').pop();
            module = await import(`../assets/images/projects/${fileName}`);
          } else if (path.includes('/images/about/')) {
            const fileName = path.split('/').pop();
            module = await import(`../assets/images/about/${fileName}`);
          } else if (path.includes('/videos/')) {
            const fileName = path.split('/').pop();
            module = await import(`../assets/videos/${fileName}`);
          }

          if (module) {
            loadedAssets[path] = module.default;
          }
        } catch (error) {
          console.warn(`Failed to load asset: ${path}`, error);
          loadedAssets[path] = path; // Fallback
        }
      }

      setAssets(loadedAssets);
    };

    if (assetPaths.length > 0) {
      loadAllAssets();
    }
  }, [assetPaths.join(',')]);

  return assets;
};