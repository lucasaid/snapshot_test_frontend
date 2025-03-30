# Assumptions
- 2 images per snapshot
- fields would be, id, name, user_id, top_image, front_image, notes
- Listing of snapshot images
- Button to upload
- Clicking into snapshot can allow for update
- Delete button on snapshot view (potentially if there is an overview page also have one here)
- confirmation of delete?
- name should be based on date?


# Questions to think about
- Do we allow pre taken photos to be uploaded?
- Lazy loading? Virtualization?


# TOOD
- Tests
- A11y
- clean up

# Would implement if more time
- fix issue with material design in tests (vitest is new to me, would prefer to use jest just ran out of time)
- Upload pre taken images
- Detect face, allow cropping of image and brightness detection
- use pnpm
- responsive to mobile
- pagination or lazy load
- Soft delete
- delete image off server (cron job for potential soft delete)