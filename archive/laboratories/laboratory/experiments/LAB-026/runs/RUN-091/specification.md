# PrismFlow

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.422223Z
**Run ID**: RUN-091
**Seed**: 1700000091

---

## Architecture

- Architecture: fully_distributed
- Node Type: heterogeneous
- Quorum Type: hierarchical

## Leader Election

- Method: load_balanced
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: read_quorum
- Vote Granting: grant_to_candidate
- Vote Revocations: False

## Log Replication

- Type: command_log
- Structure: hash_chain
- Commit Method: quorum_commit

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: adaptive

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: timing

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 462ms
- Election Timeout Base: 394ms
- Election Timeout Range: 256ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- term_update

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:load_balanced
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:read_quorum
- vote_granting:grant_to_candidate
- log:command_log
- log_structure:hash_chain
- commit:quorum_commit
- recovery:snapshot_transfer
- snapshot:adaptive
- dynamic_membership:single_config
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 49
- Elections Succeeded: 37
- Election Success Rate: 75.51%
- Messages Sent: 144
- Commits: 11
- Avg Messages/Commit: 13.09
- Leader Changes: 37
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 59
- Elections Succeeded: 57
- Election Success Rate: 96.61%
- Messages Sent: 306
- Commits: 27
- Avg Messages/Commit: 11.33
- Leader Changes: 57
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 64
- Elections Succeeded: 63
- Election Success Rate: 98.44%
- Messages Sent: 554
- Commits: 33
- Avg Messages/Commit: 16.79
- Leader Changes: 63
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 66
- Elections Succeeded: 66
- Election Success Rate: 100.00%
- Messages Sent: 810
- Commits: 31
- Avg Messages/Commit: 26.13
- Leader Changes: 66
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

