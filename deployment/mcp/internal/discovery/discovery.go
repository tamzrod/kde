// Package discovery provides project discovery functionality.
// MCP walks upward from the working directory to find .kde markers.
package discovery

import (
	"os"
	"path/filepath"

	"github.com/kde/mcp/internal/errors"
)

// MarkerFilename is the name of the KDE project marker file.
const MarkerFilename = ".kde"

// Walker walks the directory tree upward to find KDE projects.
type Walker struct{}

// NewWalker creates a new directory walker.
func NewWalker() *Walker {
	return &Walker{}
}

// Discover walks upward from startPath looking for a .kde marker.
// Returns the path to the project root (where .kde is located) or an error.
func (w *Walker) Discover(startPath string) (string, error) {
	if startPath == "" {
		return "", errors.NewError(errors.CodeProjectInvalid, "Start path cannot be empty")
	}

	// Resolve to absolute path
	absPath, err := filepath.Abs(startPath)
	if err != nil {
		return "", errors.NewError(errors.CodeIOError, "Failed to resolve path").
			WithCause(err).
			WithDetail("path", startPath)
	}

	// Check if path exists
	info, err := os.Stat(absPath)
	if err != nil {
		if os.IsNotExist(err) {
			return "", errors.NewError(errors.CodeProjectNotFound, "Path does not exist").
				WithDetail("path", absPath)
		}
		return "", errors.NewError(errors.CodeIOError, "Failed to stat path").
			WithCause(err).
			WithDetail("path", absPath)
	}

	// If it's a file, use the parent directory
	if !info.IsDir() {
		absPath = filepath.Dir(absPath)
	}

	// Walk upward looking for .kde marker
	currentDir := absPath
	for {
		markerPath := filepath.Join(currentDir, MarkerFilename)
		if _, err := os.Stat(markerPath); err == nil {
			// Found the marker
			return currentDir, nil
		}

		// Check if we've reached the root
		parentDir := filepath.Dir(currentDir)
		if parentDir == currentDir {
			break
		}
		currentDir = parentDir
	}

	return "", errors.ErrProjectNotInitialized.
		WithDetail("searched_path", absPath).
		WithDetail("root_path", filepath.Dir(absPath))
}

// Marker represents a KDE project marker.
type Marker struct {
	Path      string `json:"path"`
	Version   string `json:"version,omitempty"`
	Name      string `json:"name,omitempty"`
	CreatedAt string `json:"created_at,omitempty"`
}

// DetectMarker checks if a path contains a .kde marker and returns its metadata.
func (w *Walker) DetectMarker(path string) (*Marker, error) {
	markerPath := filepath.Join(path, MarkerFilename)

	info, err := os.Stat(markerPath)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, errors.NewError(errors.CodeProjectNotFound, "No .kde marker found").
				WithDetail("path", path)
		}
		return nil, errors.NewError(errors.CodeIOError, "Failed to stat marker").
			WithCause(err).
			WithDetail("path", markerPath)
	}

	if info.IsDir() {
		return &Marker{
			Path: markerPath,
		}, nil
	}

	// If .kde is a file, read it for metadata
	// For now, just return the path
	return &Marker{
		Path: markerPath,
	}, nil
}

// Exists checks if a .kde marker exists in the given path.
func (w *Walker) Exists(path string) bool {
	markerPath := filepath.Join(path, MarkerFilename)
	_, err := os.Stat(markerPath)
	return err == nil
}

// CreateMarker creates a .kde marker at the given path.
func (w *Walker) CreateMarker(path string) error {
	markerPath := filepath.Join(path, MarkerFilename)

	// Check if path exists
	info, err := os.Stat(path)
	if err != nil {
		return errors.NewError(errors.CodeIOError, "Path does not exist").
			WithCause(err).
			WithDetail("path", path)
	}

	if !info.IsDir() {
		return errors.NewError(errors.CodeProjectInvalid, "Path must be a directory").
			WithDetail("path", path)
	}

	// Check if marker already exists
	if w.Exists(path) {
		return errors.ErrProjectExists.WithDetail("path", path)
	}

	// Create the marker file
	file, err := os.Create(markerPath)
	if err != nil {
		return errors.NewError(errors.CodeIOError, "Failed to create marker").
			WithCause(err).
			WithDetail("path", markerPath)
	}
	file.Close()

	return nil
}
